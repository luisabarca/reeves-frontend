import { call, put, takeEvery } from "redux-saga/effects";
import { fetchError, fetchSuccess } from "../store/reducers";
import { graphql } from "../gql";
import { GetImageQuery } from "../gql/graphql";
import { client } from "../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { FormSchema } from "../form-schema";
import { PayloadAction } from "@reduxjs/toolkit";

const GET_IMAGE = graphql(`
  query GetImage($width: Int!, $height: Int, $young: Boolean, $grayScale: Boolean) {
    image(width: $width, height: $height, young: $young, grayScale: $grayScale) {
      url
    }
  }
`);

function* fetchImage({ payload }: PayloadAction<FormSchema>) {  
  try {
    const response: ApolloQueryResult<GetImageQuery> = yield call(() => client.query({
      query: GET_IMAGE,
      variables: {
        width: payload.width,
        height: !payload.height || payload.height < 1 ? payload.width : payload.height,
        young: payload.young,
        grayScale: payload.grayscale,
      }
    }));
    
    yield put(fetchSuccess(response.data.image?.url ?? ""));
  } catch (error) {
      yield put(fetchError());
  }
}

export function* imageSaga() {
  yield takeEvery("theMatrix/fetchStart", fetchImage);
}
