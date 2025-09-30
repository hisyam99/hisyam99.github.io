import { Generator } from 'graffle/generator'

export default Generator.configure({
  name: 'GraphQLClient',
  lint: {
    missingCustomScalarCodec: false
  }
})