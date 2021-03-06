import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'

class AddFlavorForm extends React.Component {
  state = {
    name: '',
    disk: 20,
    ram: 4096,
    vcpus: 2,
    public: false,
  }

  setField = field => event => this.setState({ [field]: event.target.value })

  fields = [
    { id: 'name', label: 'Name' },
    { id: 'vcpus', label: 'VCPUs', type: 'number' },
    { id: 'ram', label: 'RAM', type: 'number' },
    { id: 'disk', label: 'Disk', type: 'number' },
  ]

  renderField = ({ id, label, type = 'text' }) => {
    if (type === 'text' || type === 'number') {
      return (
        <div key={id}>
          <TextField id={id} type={type} label={label} value={this.state[id]} onChange={this.setField(id)} />
        </div>
      )
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render () {
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        {this.fields.map(this.renderField)}
        <div>
          <Button variant="raised" type="submit">Submit</Button>
        </div>
      </form>
    )
  }
}

AddFlavorForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default AddFlavorForm
