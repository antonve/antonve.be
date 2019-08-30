import styled from 'styled-components'

const Paragraph = styled.p`
  font-size: 1.8em;
  line-height: 1.4em;
`

const H1 = styled.h1`
  font-size: 3.4em;
  font-weight: bold;
  margin: 0 0 20px 0;
`

const H2 = styled.h1`
  font-size: 2.8em;
  font-weight: bold;
  margin: 0 0 15px 0;
`

const H3 = styled.h1`
  font-size: 2em;
  font-weight: bold;
  margin: 0 0 10px 0;
`

const H4 = styled.h1`
  font-size: 1.7em;
  opacity: 0.7;
  font-weight: bold;
  margin: 0 0 7px 0;
`

const Link = styled.a`
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
  text-shadow: 1px 1px #fff, -1px 1px #fff, -1px -1px #fff, 1px -1px #fff;
  z-index: 1;

  &:focus {
    outline: none;
  }

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    height: 2px;
    bottom: 4px;
    left: 0;
    width: 100%;
    opacity: 0.05;
    background: ${props => props.theme.colors.dark};
  }

  &:after {
    background: ${props => props.theme.colors.accent};
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 4px;
    left: 0;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover:after,
  &.active:after,
  &:focus:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

export { Paragraph, H1, H2, H3, H4, Link }
