from datetime import datetime, timedelta
from collections import defaultdict
from typing import List, Dict

from .workout import Workout


def workout_volume_per_week(workouts: List[Workout]) -> Dict[str, float]:
    if not workouts:
        return {}

    workouts.sort(key=lambda w: w.date)

    first_workout_date = workouts[0].date
    last_workout_date = workouts[-1].date

    current_week_start, _ = get_start_and_end_of_week(first_workout_date)
    last_week_start, last_week_end = get_start_and_end_of_week(last_workout_date)

    results = defaultdict(float)

    for workout in workouts:
        start_of_week, end_of_week = get_start_and_end_of_week(workout.date)
        week_str = format_week_period(start_of_week, end_of_week)
        results[week_str] += workout.weight_or_distance

    while current_week_start <= last_week_start:
        week_str = format_week_period(
            current_week_start, current_week_start + timedelta(days=6)
        )
        if week_str not in results:
            results[week_str] = 0.0

        current_week_start += timedelta(weeks=1)
    sorted_results = dict(
        sorted(
            results.items(),
            key=lambda item: datetime.strptime(item[0].split("-")[0], "%d/%m/%Y"),
        )
    )

    return sorted_results


def get_start_and_end_of_week(date: datetime) -> tuple[datetime, datetime]:
    start_of_week = date - timedelta(days=date.weekday())
    end_of_week = start_of_week + timedelta(days=6)
    return start_of_week, end_of_week


def format_week_period(start_of_week: datetime, end_of_week: datetime) -> str:
    return f"{start_of_week.strftime('%d/%m/%Y')}-{end_of_week.strftime('%d/%m/%Y')}"
