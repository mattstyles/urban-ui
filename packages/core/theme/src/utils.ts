// Theme utilities, provide shorthands for common operations

export const utils = {
  // Width and height in one
  size: (value: number | string) => {
    return {
      width: value,
      height: value,
    }
  },

  // Abbreviated padding properties
  p: (value: string) => ({
    padding: value,
  }),
  pt: (value: string) => ({
    paddingTop: value,
  }),
  pr: (value: string) => ({
    paddingRight: value,
  }),
  pb: (value: string) => ({
    paddingBottom: value,
  }),
  pl: (value: string) => ({
    paddingLeft: value,
  }),
  px: (value: string) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  py: (value: string) => ({
    paddingTop: value,
    paddingBottom: value,
  }),

  m: (value: string) => ({
    margin: value,
  }),
  mt: (value: string) => ({
    marginTop: value,
  }),
  mr: (value: string) => ({
    marginRight: value,
  }),
  mb: (value: string) => ({
    marginBottom: value,
  }),
  ml: (value: string) => ({
    marginLeft: value,
  }),
  mx: (value: string) => ({
    marginLeft: value,
    marginRight: value,
  }),
  my: (value: string) => ({
    marginTop: value,
    marginBottom: value,
  }),
}
