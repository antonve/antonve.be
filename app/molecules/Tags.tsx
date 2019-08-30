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
  margin: 5px 0 0 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 100%;

  & + & {
    margin-top: 45px;
  }
`

const Tag = styled.li`
  min-height: 15px;
  background: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.dark};
  font-size: 1.5em;
  line-height: 1.5em;
  padding: 4px 10px 0;
  display: block;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.05);
  margin-right: 10px;
  margin-top: 10px;

  &:last-child {
    margin-right: 0;
    border: none;
  }
`
