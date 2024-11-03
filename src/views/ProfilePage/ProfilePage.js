import React, { useEffect, useState, useContext } from "react";
import "./ProfilePage.css";
import calendar from "../../assets/calendar.png";
import { BASE_URL_API } from "../../utils/Constants";
import RequestSvc from "../../services/RequestSvc";
import perfilpic from "../../assets/avatar.jpg";
import UserContext from '../../UserContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  
  const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];
  const month = months[date.getMonth()];
  
  return `${day}-${month}-${year}`;
};


function getRandomNumber() {
  return Math.floor(Math.random() * (8000 - 1000 + 1)) + 1000;
}

const ProfilePage = () => { 
  
  const { user, fetchUserData, imageVersion, setImageVersion } = useContext(UserContext);

  
  const [iDPersona, setIDPersona] = useState("");
  const [planData, setPlanData] = useState({});
  const [firstName, setFirstName] = useState(user?.Nombre || "");
  const [lastName, setLastName] = useState(user?.Apellido || "");
  const [email, setEmail] = useState(user?.Email || "");
  const [mobileNumber, setMobileNumber] = useState(user?.Telefono || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState([]);

  const getPlanData = async () => {
    let svc = new RequestSvc();
    let result = await svc.get(`${BASE_URL_API}getFeatures/?UserID=1580&getPlanDetails=true`).catch((err) => console.log(err));
    if (result.error) {
      alert("No logramos procesar su solicitud");
    }
    setPlanData(result.data);
  };

  const getFeatures = async () => {
    let svc = new RequestSvc();
    let result = await svc.get(`${BASE_URL_API}getFeatures/?UserID=1580`).catch((err) => console.log(err));
    if (result.error) {
      alert("No logramos procesar su solicitud");
      setFeatures([]);
    } else {
      setFeatures(result.data);
    }
  };

  useEffect(() => {
    if (user) {
      setEmail(user.Email);
      setFirstName(user.Nombre);
      setLastName(user.Apellido);
      setMobileNumber(user.Telefono);
      setIDPersona(user.IDPersona);
      getFeatures();
    }
    getPlanData();
  }, [user]);

  const submitPasswordHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== verifyPassword) {
      alert("Passwords don't match");
    } else {
      let svc = new RequestSvc();
      let result = await svc.post(`${BASE_URL_API}userAccess`, { Password: newPassword }).catch((err) => console.log(err));
      console.log(result);
      if (result.error) {
        alert("No logramos procesar su solicitud");
      } else {
        alert("Sus datos han sido actualizados");
      }
    }
  };

  const submitProfileHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);
    formData.append("IDPersona", iDPersona);
    formData.append("Nombre", firstName);
    formData.append("Apellido", lastName);
    formData.append("Telefono", mobileNumber);
    let svc = new RequestSvc();
    let result = await svc.postFormData(`${BASE_URL_API}userProfile`, formData).catch((err) => console.log(err));
    console.log(result);
    if (result.error) {
      alert("No logramos procesar su solicitud");
    } else {
      
      await fetchUserData(); // Refresh user data in context
      alert("Your data has been updated");
      
      // Increment the image version
      setImageVersion((prevVersion) => prevVersion + getRandomNumber());
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const validateText = (text) => {
    return /^[A-Za-z]+$/.test(text);
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    if (validateText(value) || value === "") {
      setFirstName(value);
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (validateText(value) || value === "") {
      setLastName(value);
    }
  };


  return (
    <div className="ProfilePage">
      {
        loading ?
          <div className="loadingIndicator">Loading...</div>
          :
          <div className="inner">
            <h3 className="title">Mi cuenta</h3>
          
            <div className="sectionsContainer">
              <section>
                <div className="perfilSection">
                  <div className="perfilCard">
                    <h4>Mi perfil</h4>
                    <div className="header">
                      <div className="userImg">
                      <img
                        src={
                          selectedFile
                            ? URL.createObjectURL(selectedFile)
                            : user?.Foto 
                            ? `${user.Foto}?v=${getRandomNumber()}`
                            : perfilpic
                        }
                        alt=""
                      />
                      </div>
                      <div className="userButtons">
                        <input type="file" id="profilePicture" name="profilePicture" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                      <label htmlFor="profilePicture" className="uploadBtn">
                        Cambiar foto
                      </label>
                        <br />
                      <button className="secondBtn" onClick={() => setSelectedFile(null)}>
                        Eliminar foto
                      </button>
                      </div>
                    </div>
                    <div className="perfilForm">
                      <form onSubmit={submitProfileHandler}>
                        <div className="nameSection">
                          <div className="Name">
                            <label htmlFor="inputFirstname" className="form-label">
                              Nombre
                            </label>
                            <input
                              required
                              type="text"
                              className="form-control"
                              placeholder="Juan"
                              value={firstName}
                              onChange={handleFirstNameChange}
                            />
                          </div>
                          <div className="Name">
                            <label htmlFor="inputSname" className="form-label">
                              Apellido
                            </label>
                            <input
                              required
                              type="text"
                              className="form-control"
                              placeholder="Londono"
                              value={lastName}
                              onChange={handleLastNameChange}
                            />
                          </div>
                        </div>
                        <div className="email">
                          <label htmlFor="inputEmail4" className="form-label">
                            Correo electrónico
                          </label>
                          <input
                            disabled
                            type="email"
                            className="form-control"
                            placeholder="plataformas@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="number">
                          <label htmlFor="inputNumber" className="form-label">
                            Teléfono móvil
                          </label>
                          <input
                            required
                            type="number"
                            className="form-control"
                            placeholder="(57) 3252861967"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                          />
                        </div>
                        <div className="formbtn">
                          <button type="submit">Guardar información</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <form className="accesoSection" onSubmit={submitPasswordHandler}>
                  <p>Contraseña de acceso</p>
                  <div>
                    <label htmlFor="inputActual4" className="form-label">
                      Contraseña actual
                    </label>
                    <input
                      required
                      type="password"
                      className="form-control"
                      placeholder="Ingresa su contraseña actual"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="nueva">
                    <label htmlFor="inputNueva" className="form-label">
                      Nueva contraseña
                    </label>
                    <input
                      required
                      type="password"
                      className="form-control"
                      placeholder="Ingresa su nueva contraseña"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputVerification" className="form-label">
                      Verificación
                    </label>
                    <input
                      required
                      type="password"
                      className="form-control"
                      placeholder="Repita su nueva contraseña"
                      value={verifyPassword}
                      onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                  </div>
                  <div className="accesoBtn">
                    <button type="submit">Actualizar contraseña</button>
                  </div>
                </form>
              </section>
              <section>
                <div className="planSection">
                  <div className="iconText">
                    <div className="planIcon">
                      <img src={calendar} alt="" />
                    </div>
                    <div className="planText">
                      <h4>Plan {planData?.PlanName}</h4>
                    </div>
                  </div>
                  <div className="planDate">
                    <p>
                      Días para Disfrutar la suscripcion: {planData?.DaysLeft}
                     
                    </p>
                    <p>
                      Próximo cobro: {formatDate(planData?.NextDateCharge)}
                    </p>
                  </div>
                  <div id="features">
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ 
                              fontSize: '16px',
                              fontWeight: 'bold'
                            }}>Poderes</TableCell>
                            <TableCell sx={{ 
                              fontSize: '16px',
                              textAlign: 'center',
                              fontWeight: 'bold'
                            }}>Has Usado</TableCell>
                            <TableCell sx={{ 
                              fontSize: '16px',
                              textAlign: 'center',
                              fontWeight: 'bold'
                            }}>Límite</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {features.map((feature) => (
                            <TableRow key={feature.Usuarios_Features_PlanesID}>
                              <TableCell sx={{ fontSize: '16px' }}>{feature.FK_FeaturePlanCode}</TableCell>
                              <TableCell sx={{ 
                                fontSize: '16px',
                                textAlign: 'center'
                              }}>{feature.TotalUsed}</TableCell>
                              <TableCell sx={{ 
                                fontSize: '16px',
                                textAlign: 'center'
                              }}>{feature.Limite}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div className="planBtn" style={{ marginTop: '30%' }}>
                    <button className="blue">Cambiar plan</button>
                    <button 
                      className="red" 
                      onClick={() => window.open('https://help.hotmart.com/es/article/115002183968/-como-cancelar-mi-suscripcion-', '_blank')}
                    >
                      Cancelar suscripción
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
      }
    </div>
  );
};

export default ProfilePage;
