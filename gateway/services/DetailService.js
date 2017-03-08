import { Detail } from '../models'

const getDetails = () => {
	return Detail.forge().fetchAll().then((collection) => {
		return collection.toJSON()
	})
}

export {
	getDetails
}