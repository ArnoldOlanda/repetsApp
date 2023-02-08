export const postNotificationTokenService = async (user, token) => {

    try {
        if (uid !== null) {
            const { data } = await repetsAPI.put(`/usuarios/notification_token/${uid}`, {
                token
            })

            // console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
}