import { Alert } from 'flowbite-react';
import { useEffect } from 'react';
import { alertState } from '../context/AlertContext';

function ShowAlert() {
    const { alert, setAlert } = alertState();
    useEffect(() => {
        let temp;
        temp = setTimeout(() => {
            setAlert(null)
        }, 5000)

        return () => {
            clearTimeout(temp)
        }
    }, [alert])
    return (
        <>
            {alert ?
                <Alert className='md:w-1/4 w-1/2 fixed bottom-10 right-10 z-10' color={alert.type} onDismiss={() => setAlert(null)}>
                    {alert.message}
                </Alert>
                :
                ''
            }
        </>

    );
}

export default ShowAlert