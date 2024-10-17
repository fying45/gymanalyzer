from fastapi import FastAPI, Query
from typing import Dict
import uvicorn
from constant import DATE_FORMAT
from workout import workout, volume
from datetime import datetime


app = FastAPI()

workouts_list = workout.read_workouts_from_csv("../data/GymBook-Logs-2024-10-11.csv")


@app.get("/workouts/volume", response_model=Dict[str, float])
async def get_worktout_volume():
    return volume.workout_volume_per_week(workouts_list)


# @app.get("/dates", response_model=workout.ClosingDates)
# async def get_earliest_and_latest_dates():
#     return workout.get_closing_dates(workouts=workouts_list)


if __name__ == "__main__":
    # Lancer le serveur FastAPI avec uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
