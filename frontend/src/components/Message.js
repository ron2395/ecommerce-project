import { Alert } from 'react-bootstrap';

const Message = ({ variant, children, className }) => {
  return (
    <Alert variant={variant} className={className ? className : 'text-center'}>
        {children}
    </Alert>
  )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message;