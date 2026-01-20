'use server';

import { revalidatePath } from 'next/cache';
import { deleteMovie } from '../../lib/api';

export async function deleteMovieApi(id: number) {
  await deleteMovie((id));
  revalidatePath('/admin/movies');
}
