import { Detail } from 'src/models'

const getDetails = () => {
	return Detail.forge().fetchAll().then((collection) => {
		return collection.toJSON()
	})
}

export {
	getDetails
}
