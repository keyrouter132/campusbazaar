import { supabase } from './supabaseClient';

export async function getPendingSellers() {
  return await supabase
    .from('users')
    .select('id, uid, email')
    .eq('role', 'seller')
    .eq('seller_status', 'pending');
}

export async function approveSeller(userId) {
  return await supabase
    .from('users')
    .update({ seller_status: 'approved' })
    .eq('id', userId);
}
