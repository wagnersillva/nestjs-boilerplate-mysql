interface IGetLabel {
  required: string,
  mustBeString: string,
  invalidFormat: string,
  notFound: string,
  exists: string,
  notsaved: string,
}

export const getLabel = (attr?: string, prefix?: string ): IGetLabel => {
  const initialMessage = `${prefix ? `${prefix}.` : ''}${attr ?? 'default'}`
  return {
    mustBeString: `${initialMessage}.error.mustBeString.label`,
    required: `${initialMessage}.error.required.label`,
    invalidFormat: `${initialMessage}.error.invalidFormat.label`,
    notFound: `${initialMessage}.error.invalidFormat.label`,
    exists: `${initialMessage}.error.exists.label`,
    notsaved: `${initialMessage}.error.notsaved.label`,
  }
}