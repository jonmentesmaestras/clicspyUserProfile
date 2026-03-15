import './index.css';

const Button = ({ text, onClick, type = 'primary', disabled = false }) => {
  return (
    <button onClick={onClick} className={`button-${type}`} disabled={disabled}>
      {text}
    </button>
  )
}

export default Button