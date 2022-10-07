import {UrlParamsType} from "../../features/packs/packs-reducer";

export const filterQueryParams = (searchParams: {}) => {
    const params: any = searchParams

    for (let el in params) {
        if (params[el] === '' || params[el] === '0') {
            delete params[el]
        }
    }
    return params
}