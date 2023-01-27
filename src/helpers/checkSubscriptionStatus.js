//@ts-check

import { repetsAPI } from "../api";

/**
 * 
 * @param {string} uid pethouser user id
 * @returns void
 */
export const checkSubscriptionStatus = async (uid) => {

    try {
        const { data } = await repetsAPI.get(`/subscription/status/${uid}`)
        console.log(data)
    } catch (error) {
        console.log(error.response)
    }
}