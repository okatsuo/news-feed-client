import { Alert, Snackbar } from '@mui/material'

type ScreenAlertProps = {
  message: string
  onClose: (value?: any) => void
  severity: 'error' | 'warning' | 'success' | 'info'
}

export const ScreenAlert = (props: ScreenAlertProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={Boolean(props.message)}
      onClose={() => props.onClose('')}
      autoHideDuration={6000}
    >
      <Alert
        severity={props.severity}
        variant='filled'
      >
        {props.message}
      </Alert>
    </Snackbar>
  )
}