import {gql} from '@apollo/client';

export const GET_USER = gql`
  query getUser($userId: Int!) {
    getUser(userId: $userId) {
      id
      email
      userName
      createdAt
      profile {
        firstName
        lastName
        avatars {
          url
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query getUsers(
    $searchTerm: String
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $statusFilter: UserBlockStatus
  ) {
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
        userBan {
          reason    
          createdAt  
        }
      }
      pagination {
        page
        totalCount
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($userId: Int!) {
    removeUser(userId: $userId)
  }
`;

export const BAN_USER = gql`
    mutation banUser($banReason: String!, $userId: Int!){
        banUser(banReason: $banReason, userId: $userId)
    }
`;

export const UNBAN_USER = gql`
    mutation unbanUser($userId: Int!){
        unbanUser(userId: $userId)
    }
`;

export const GET_POSTS_BY_USER = gql`
  query getPostsByUser($userId: Int!, $endCursorId: Int!) {
    getPostsByUser(userId: $userId, endCursorId: $endCursorId) {
      items {
        url
      }
    }
  }
`;

export const GET_PAYMENTS_BY_USER = gql`
  query getPaymentsByUser(
    $userId: Int!
    $pageSize: Int = 100
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getPaymentsByUser(
      userId: $userId
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      totalCount
      items {
        paymentType
        price
        dateOfPayment
        endDate
        type
      }
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query getFollowers(
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $userId: Int!
  ) {
    getFollowers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId
    ) {
      totalCount
      items {
        id
        userId
        userName
        createdAt
      }
    }
  }
`;

export const GET_FOLLOWING = gql`
  query getFollowing(
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $userId: Int!
  ) {
    getFollowing(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId
    ) {
      totalCount
      items {
        id
        userId
        userName
        createdAt
      }
    }
  }
`;

export const GET_PAYMENTS = gql`
  query getPayments(
    $searchTerm: String
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getPayments(
      searchTerm: $searchTerm
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      items {
        amount
        avatars {
          url
        }
        createdAt
        currency
        id
        paymentMethod
        type
        userId
        userName
      }
      page
      pageSize
      pagesCount
      totalCount
    }
  }
`
