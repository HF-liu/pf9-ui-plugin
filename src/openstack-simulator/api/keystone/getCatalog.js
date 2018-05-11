import Catalog from '../../models/Catalog'
import { mapAsJson } from '../../helpers'

const getCatalog = (req, res) => {
  const catalog = Catalog.getCatalog()
  return res.send({ catalog: catalog, links: { self: "/keystone/v3/auth/catalog" } })
}

export default getCatalog
