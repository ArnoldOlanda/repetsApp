import {repetsAPI} from '../../api';

export const checkVerifyCodeService = async (
  id,
  verifyCode,
  verifyCodeFromEmail,
) => {
  try {
    const {data} = await repetsAPI.patch('/usuarios/verifyAccount', {
      id,
      generateCode: Number(verifyCode),
      givenCode: Number(verifyCodeFromEmail),
    });

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      err: error.response.data.err,
    };
  }
};
