<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Voitures;
use Illuminate\Http\Request;

class VoitureController extends Controller
{
    
    public function index()
    {
        return Voitures::all();
        
    }

   
    public function store(Request $request)
    {
        $validations= $request->validate([
            'marque' => 'required',
            'description' => 'required',
            'prix_par_jour' => 'required|',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:6000',
            'quantite' => 'required',
            'status' => 'required'
        ]);

        if ($request->hasFile('image')) {
            $image = time() . '.' . $request->image->extension();
            $request->image->storeAs('images', $image, 'public');
            $validations['image'] = $image;
        }

        $voiture = new Voitures();
        $voiture->marque= $request->marque;
        $voiture->description = $request->description;
        $voiture->prix_par_jour = $request->prix_par_jour;
        $voiture->image = $validations['image'] ?? null;
        $voiture->quantite = $request->quantite;
        $voiture->status = $request->status;
        $voiture->save();
        return response()->json([
            'status' => '201',
            'message' => 'Voiture creee',
            'data' => $voiture
        ]);
    }

   
    public function show(string $id)
    {
       $voiture = Voitures::findOrFail($id);
        
        return response()->json($voiture, 200);
    }

   
    public function update(Request $request, string $id)
    {
        $validations = $request->validate([
            'marque' => 'required',
            'description' => 'required',
            'prix_par_jour' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:6000',
            'quantite' => 'required',
            'status' => 'required'
        ]);   

        $voiture = Voitures::findOrFail($id);
        $voiture->marque = $request->marque;
        $voiture->description = $request->description;
        $voiture->prix_par_jour = $request->prix_par_jour;
        $voiture->quantite = $request->quantite;
        $voiture->status = $request->status;
        if ($request->hasFile('image')) {
            $image = time() . '.' . $request->image->extension();
            $request->image->storeAs('images', $image, 'public');
            $voiture->image = $image;
        }
        $voiture->save();
        return response()->json([
            'status' => '200',
            'message' => 'Voiture mis a jour',
            'data' => $voiture
        ]);
    }

    
    public function destroy(string $id)
    {
       $voiture = Voitures::findOrFail($id);
        $voiture->delete();
        return response()->json([
            'status' => '200',
            'message' => 'Voiture supprimee',
            'data' => $voiture
        ]);
    }
}
