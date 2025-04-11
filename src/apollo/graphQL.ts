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
