import styled from 'styled-components'
import { Wrapper } from './Wrapper'

export const Background = styled(Wrapper)`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-size: cover;
  background-image: ${({ image }) => image && `url(${image})`};
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;
`
