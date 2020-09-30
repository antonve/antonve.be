import styled from 'styled-components'

export const SingleColumnTemplate = styled.div<{ width?: string }>`
  max-width: ${props => (props.width ? props.width : `560px`)};
  box-sizing: border-box;
  padding: 60px 20px;
  margin: 0 auto;

  @media print {
    padding: 0;
  }

  @media only screen and (max-width: 600px) {
    padding: 20px;
  }
`

export const TwoColumnTemplate = styled.div`
  display: flex;

  > div {
    margin: 0 20px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }

  @media only screen and (max-width: 800px) {
    flex-direction: column;

    > div {
      margin: 0;
    }
  }
`
