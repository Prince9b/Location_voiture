<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Voitures;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
 public function store(Request $request)
{
    $request->validate([
        'voiture_id' => 'required|exists:voitures,id',
        'date_debut' => 'required|date|after_or_equal:today',
        'date_fin' => 'required|date|after_or_equal:date_debut',
        'prix_total' => 'required|numeric|min:0',
    ]);

    $voiture = Voitures::findOrFail($request->voiture_id);

    if ((int)$voiture->quantite <= 0) {
        return response()->json([
            'message' => 'Désolé, cette voiture n\'est plus disponible pour réservation.'
        ], 400);
    }

    $reservation = Reservation::create([
        'user_id' => auth()->id(),
        'voiture_id' => $voiture->id,
        'date_debut' => $request->date_debut,
        'date_fin' => $request->date_fin,
        'prix_total' => $request->prix_total,
        'status' => 'active',
    ]);

    $voiture->quantite = (int)$voiture->quantite - 1;

    if ($voiture->quantite == 0) {
        $voiture->status = 'indisponible';
    }

    $voiture->save();

    return response()->json($reservation, 201);
}


    public function index()
{
    $reservations = Reservation::with(['user', 'voiture'])->orderBy('created_at', 'desc')->get();

    return response()->json($reservations);
}
public function destroy($id)
{
    $reservation = Reservation::findOrFail($id);

    $voiture = $reservation->voiture;

    if ($voiture) {
        $voiture->quantite = (int)$voiture->quantite + 1;

        if ($voiture->status === 'indisponible') {
            $voiture->status = 'disponible';
        }

        $voiture->save();
    }

    $reservation->delete();

    return response()->json(['message' => 'Réservation supprimée, stock mis à jour']);
}


public function valider($id)
{
    $reservation = Reservation::findOrFail($id);
    $reservation->status = 'validée';
    $reservation->save();

    return response()->json(['message' => 'Réservation validée']);
}

public function mesReservations()
    {
        $reservations = Reservation::with('voiture')
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($reservations);
    }

}
