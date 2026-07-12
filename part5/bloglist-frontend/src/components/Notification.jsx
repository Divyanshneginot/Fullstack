const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    display: 'inline-block',
    padding: '5px',
    color: 'green',
    fontStyle: 'Bold',
    border: '4px green',
    backgroundColor: 'gray'
  }
  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  )
}
export default Notification