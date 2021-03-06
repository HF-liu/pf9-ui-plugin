import { gql } from 'apollo-boost'

export const GET_VOLUME = gql`
  query GetVolumeById($id: ID!) {
    volume(id: $id) {
      id
      name
      description
      bootable
    }
  }
`

export const GET_VOLUMES = gql`
  {
    volumes {
      id
      name
      description
      volume_type
      status
      metadata
      size
      bootable
      tenant
      source
      host
      instance
      device
      created_at
      attachedMode
      readonly
    }
  }
`

export const REMOVE_VOLUME = gql`
  mutation RemoveVolume($id: ID!) {
    removeVolume(id: $id)
  }
`

export const ADD_VOLUME = gql`
  mutation CreateVolume($input: VolumeInput!) {
    createVolume(input: $input) { id name description volume_type status metadata size bootable tenant source host instance device created_at attachedMode readonly }
  }
`

export const UPDATE_VOLUME= gql`
  mutation UpdateVolume($id: ID!, $input: UpdateInput!) {
    updateVolume(id: $id, input: $input) { id name description bootable }
  }
`
