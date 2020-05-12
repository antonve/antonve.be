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
  font-size: 2.2em;
  font-weight: bold;
  margin: 0 0 15px 0;
`

const H3 = styled.h1`
  font-size: 1.7em;
  font-weight: bold;
  margin: 0 0 10px 0;
`

const H4 = styled.h1`
  font-size: 1.2em;
  opacity: 0.7;
  font-weight: bold;
  margin: 0 0 7px 0;
`

const Link = styled.a`
  color: ${props => props.theme.colors.primary};
  position: relative;
  z-index: 1;
  transition: color 0.25s ease-out 0s;

  &:hover,
  &:active,
  &:focus,
  &.active {
    color: ${props => props.theme.colors.foreground};
    text-decoration: none;
    outline: none;
  }

  &::after {
    background: ${props => props.theme.colors.secondary};
    content: '';
    position: absolute;
    z-index: -1;
    top: 0.7em;
    left: 0.3em;
    width: 99%;
    height: 0.7em;
    opacity: 0.5;
    transition: transform 0.25s ease-out 0s, background 0.25s ease-out;
    transform-origin: right bottom;
    transform: scaleX(0);
  }

  &:hover::after,
  &:active::after,
  &:focus::after,
  &.active::after {
    transform: scaleX(1);
    transform-origin: left bottom;
  }

  &.active:hover::after {
    background: ${props => props.theme.colors.primary};
  }
`

export { Paragraph, H1, H2, H3, H4, Link }
