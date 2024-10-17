from dataclasses import dataclass
from typing import List, Optional
import csv
from datetime import datetime
import re

from constant import DATE_FORMAT


@dataclass
class Workout:
    date: datetime
    training: str
    time: str
    exercise: str
    region: str
    primary_muscle_groups: List[str]
    secondary_muscle_groups: List[str]
    series_type: str  # Warm-up, Recovery, or Regular series
    reps_or_time: str  # Repetitions or time duration
    weight_or_distance: float
    notes: Optional[str] = None
    skipped: bool = False


def read_workouts_from_csv(file_path: str) -> List[Workout]:
    workouts = []
    with open(file_path, mode="r", newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row["Sautée"].strip().lower() == "oui":
                continue
            if (
                row["Série / Série d'échauffement / Série de récupération"]
                .strip()
                .lower()
                != "série"
            ):
                continue
            if not re.match(
                r"^.*répétitions$", row["Répétitions / Temps"].strip().lower()
            ):
                continue

            weight = float(
                "".join([c for c in row["Poids / Distance"] if c.isdigit() or c == "."])
            )

            workout = Workout(
                date=datetime.strptime(row["Date"], DATE_FORMAT),
                training=row["Entraînement"],
                time=row["Heure"],
                exercise=row["Exercice"],
                region=row["Région"],
                primary_muscle_groups=[
                    group.strip()
                    for group in row["Groupes musculaires (Primaires)"].split(",")
                ],
                secondary_muscle_groups=(
                    [
                        group.strip()
                        for group in row["Groupes musculaires (Secondaires)"].split(",")
                    ]
                    if row["Groupes musculaires (Secondaires)"]
                    else []
                ),
                series_type=row["Série / Série d'échauffement / Série de récupération"],
                reps_or_time=row["Répétitions / Temps"],
                weight_or_distance=weight,
                notes=row.get("Notes", "").strip() or None,
                skipped=row["Sautée"].strip().lower()
                == "oui",  # Adapté pour "Oui"/"Non"
            )
            workouts.append(workout)
    return workouts
