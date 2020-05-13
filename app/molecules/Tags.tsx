import React from 'react'
import styled from 'styled-components'

interface Props {
  list: string[]
}

const Tags = ({ list }: Props) => (
  <List>
    {list.map((tag, key) => (
      <Tag key={key}>{tag}</Tag>
    ))}
  </List>
)

export { Tags }

const List = styled.ul`
  padding: 0;
  margin: 4px 0 0 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 100%;

  & + & {
    margin-top: 45px;
  }

  @media print {
    margin: 0;
  }
`

const Tag = styled.li`
  color: ${props => props.theme.colors.foreground};
  position: relative;
  font-size: 1.3em;
  display: block;
  margin-right: 10px;
  margin-top: 4px;

  @media print {
    margin-top: 0;

    &::after {
      display: none;
    }
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
    opacity: 0.2;
  }

  &:last-child {
    margin-right: 0;
  }
`
