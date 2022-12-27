import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
export const client = sanityClient({
    projectId: 'dijvy9mu',
    dataset : 'production',
    apiVersion : '2022-11-11',
    useCdn: true,
token: 'skdVQejbpaSr0UD47Dzyipz50RqXOOPhOaASGuV9K37WDMRskgGNyqdtOpLhwx70QMOpc8Y7QOCGI9gTuO5ZaHA6SKE3q6yqu3t9gpjebbbXDnrqSOv066VRHCBNlgnY4sKM9aBMu12DRTxSObKw5XarmdEKKc4J5t6BT2juSGigfX7f5j1l'
})
const builder = imageUrlBuilder(client)
export const urlFor =(source)=>{
    return builder.image(source)
}