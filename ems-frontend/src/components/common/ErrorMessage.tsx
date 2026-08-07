interface ErrorMessageProps {
    message: string
}

function ErrorMessage({message} :ErrorMessageProps){
    return (
         <div className="alert alert-danger mt-4">
            {message}
        </div>
    )
}

export default ErrorMessage;