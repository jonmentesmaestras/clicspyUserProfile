import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import calendar from "../../assets/calendar.png";
import { BASE_URL_API } from "../../utils/Constants";
import RequestSvc from "../../services/RequestSvc";
import perfilpic from "../../assets/perfilPic.png";

const ProfilePage = () => {
  const [iDPersona, setIDPersona] = useState("");
  const [userProfileData, setUserProfileData] = useState({});
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [planData, setPlanData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProfileData = async () => {
    setLoading(true);
    let svc = new RequestSvc();
    let result = await svc.get(`${BASE_URL_API}userProfile`).catch((err) => console.log(err));
    setLoading(false);
    if (result?.error) {
      alert("No logramos procesar su solicitud");
    }
    setUserProfileData(result?.data);
    setUserProfilePicture(result?.data?.Foto);
    setFirstName(result?.data?.Nombre);
    setLastName(result?.data?.Apellido);
    setMobileNumber(result?.data?.Telefono);
    setIDPersona(result?.data?.IDPersona);
  };

  const getPlanData = async () => {
    let svc = new RequestSvc();
    let result = await svc.get(`${BASE_URL_API}userPlan`).catch((err) => console.log(err));
    if (result.error) {
      alert("No logramos procesar su solicitud");
    }
    setPlanData(result.data);
  };

  useEffect(() => {
    getProfileData();
    getPlanData();
  }, []);

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

  const submitProfileHandler = async () => {
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
      alert("Sus datos han sido actualizados");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  console.log(userProfileData);


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
                        <img src={selectedFile ? URL.createObjectURL(selectedFile) : userProfilePicture ? userProfilePicture : perfilpic} alt="" />
                      </div>
                      <div className="userButtons">
                        <input type="file" id="profilePicture" name="profilePicture" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                        <label htmlFor="profilePicture" className="uploadBtn">Cambiar foto</label>
                        <br />
                        <button className="secondBtn" onClick={() => setSelectedFile(null)}>Eliminar foto</button>
                      </div>
                    </div>
                    <div className="perfilForm">
                      <form>
                        <div className="nameSection">
                          <div className="Name">
                            <label htmlFor="inputFirstname" className="form-label">
                              Nombre
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Juan"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="Name">
                            <label htmlFor="inputSname" className="form-label">
                              Apellido
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Londono"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
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
                            type="number"
                            className="form-control"
                            placeholder="(57) 3252861967"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                          />
                        </div>
                      </form>
                      <div className="formbtn">
                        <button onClick={submitProfileHandler} type="submit">Guardar información</button>
                      </div>
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
                    <h6>{planData?.DaysLeft}</h6>
                    <p>
                      Próximo cobro:
                      <br />
                      {planData?.NextDateCharge}
                    </p>
                  </div>
                  <div className="planBtn">
                    <button className="blue">Cambiar plan</button>
                    <button className="red">Cancelar suscripción</button>
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
