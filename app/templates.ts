import styled from 'styled-components'

export const SingleColumnTemplate = styled.div<{ width?: string }>`
  max-width: ${props => (props.width ? props.width : `560px`)};
  box-sizing: border-box;
  padding: 60px 20px;
  margin: 0 auto;

  @media print {
    padding: 0;
  }
`
