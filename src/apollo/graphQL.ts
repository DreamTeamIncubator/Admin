import {gql} from '@apollo/client';

export const GET_USER = gql`
  query getUser($userId: Int!) {
    getUser(userId: $userId) {
      id
      email
      userName
    }
  }
`;

export const GET_USERS = gql`
  query getUsers($searchTerm: String, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection, $statusFilter: UserBlockStatus) {
    getUsers(
      searchTerm: $searchTerm
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      statusFilter: $statusFilter
    ) {
      users {
        id
        userName
        userBan {
          reason    
          createdAt  
        }
        profile {
            userName
            createdAt
        }
      }
      pagination {
        page
        totalCount
      }
    }
  }
`

export const REMOVE_USER = gql`
    mutation removeUser($userId: Int!){
        removeUser(userId: $userId)
    }
`
export const BAN_USER = gql`
    mutation banUser($banReason: String!, $userId: Int!){
        banUser(banReason: $banReason, userId: $userId)
    }
`
