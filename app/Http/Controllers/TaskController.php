<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = auth()->user()->tasks()->orderBy('created_at', 'desc')->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['title' => 'required|max:255']);

        auth()->user()->tasks()->create([
            'title' => $request->title,
            'completed' => false,
        ]);

        return redirect()->back();
    }

    public function update(Task $task)
    {
        $task->update(['completed' => !$task->completed]);
        return redirect()->back();
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return redirect()->back();
    }
}