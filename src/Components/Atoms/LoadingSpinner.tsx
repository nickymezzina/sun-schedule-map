import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

interface ContainerProps {
  $styles: {
    fontSize: string
    color: string
  }
}
const Container = styled.div<ContainerProps>`
  font-size: ${props => props.$styles.fontSize};
  color: ${props => props.$styles.color};
  animation: spin 0.67s cubic-bezier(.92,.42,.51,.79) infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); } 
  }
`

interface SpinnerProps {
  fontSize?: string
  color?: string
}

const LoadingSpinner = ({fontSize, color}: SpinnerProps) => {
  const defaults = {
    fontSize: '1rem',
    color: '#BE0000'
  }

  return (
    <Container $styles={{fontSize: fontSize || defaults.fontSize, color: color || defaults.color}}>
      <FontAwesomeIcon icon={faSpinner}/>
    </Container>
  )
}

export default LoadingSpinner