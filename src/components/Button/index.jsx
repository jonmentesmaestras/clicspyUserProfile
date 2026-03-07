import './index.css';

const Button = ({ text, onClick, type = 'primary' }) => {
  return (
    <button onClick={onClick} className={`button-${type}`}>
      {text}
    </button>
  )
}

export default Button