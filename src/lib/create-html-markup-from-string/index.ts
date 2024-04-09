export const createMarkup = (htmlString: string): { __html: string | TrustedHTML } | undefined => {
  return { __html: htmlString }
}
