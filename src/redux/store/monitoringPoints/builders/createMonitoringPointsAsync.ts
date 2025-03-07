import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { FetchStatus } from "../../../types";
import { IMonitoringPoint, IMonitoringPointsState, NewPoint } from "../types";
import { MonitoringPointsService } from "../../../../services/api/monitoringPoints/MonitoringPointsService";

export const createMonitoringPoint = createAsyncThunk(
  "monitoringPoints/createMonitoringPoints",
  async (monitoringPoint: NewPoint) => {
    const response = await MonitoringPointsService.create(monitoringPoint);
    return response.data;
  },
);

export const createMonitoringPointAsyncBuilder = (
  builder: ActionReducerMapBuilder<IMonitoringPointsState>,
) => {
  builder
    .addCase(createMonitoringPoint.pending, (state, _action) => {
      state.status = FetchStatus.loading;
    })
    .addCase(
      createMonitoringPoint.fulfilled,
      (state, { payload }: PayloadAction<IMonitoringPoint>) => {
        state.status = FetchStatus.succeeded;
        state.monitoringPoints.push(payload);
        state.total += 1;
      },
    )
    .addCase(createMonitoringPoint.rejected, (state, { error }) => {
      state.status = FetchStatus.failed;
      state.error = error.message;
    });
};
