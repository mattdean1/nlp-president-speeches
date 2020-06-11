import styled from 'styled-components'

const List = styled.div`
  margin-top: 50px;

  & > div {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`

export default List
