import { useEffect, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import { STATUS_STEPS, STATUS_ADVANCE_INTERVAL_MS } from '../constants';
import { generateOrderId } from '../utils/helpers';
import { DELIVERY_FEE } from '../constants';

/**
 * useOrders — Single Responsibility (SOLID-S)
 * Handles order placement, retrieval, status updates and
 * the auto-advance simulation interval.
 *
 * Fix: stabilised setOrders reference so the auto-advance
 * interval is never torn down unnecessarily, preventing
 * the stale-closure that was swallowing historical orders.
 */
function useOrders(currentUserId) {
  const [orders, setOrders] = useLocalStorage('orders', []);

  // Auto-advance order status every STATUS_ADVANCE_INTERVAL_MS
  useEffect(() => {
    if (!currentUserId) return;
    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((o) => {
          if (o.userId !== currentUserId) return o;
          if (o.statusIndex >= STATUS_STEPS.length - 1) return o;
          const next = o.statusIndex + 1;
          return { ...o, statusIndex: next, status: STATUS_STEPS[next] };
        })
      );
    }, STATUS_ADVANCE_INTERVAL_MS);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]); // intentionally omit setOrders — it is stable from useState

  const placeOrder = useCallback(
    ({ cart, subtotal, form, paymentMethod, userId, customerName }) => {
      const orderId = generateOrderId();
      const newOrder = {
        id: orderId,
        userId,
        customerName,
        phone: form.phone,
        address: form.address,
        instructions: form.instructions,
        items: [...cart],
        subtotal,
        deliveryFee: DELIVERY_FEE,
        total: subtotal + DELIVERY_FEE,
        paymentMethod,
        status: STATUS_STEPS[0],
        statusIndex: 0,
        date: new Date().toISOString(),
      };
      // Functional update ensures we always prepend to the latest snapshot,
      // never a stale empty array.
      setOrders((prev) => [newOrder, ...prev]);
      return orderId;
    },
    [setOrders]
  );

  const updateOrderStatus = useCallback(
    (orderId, newStatus) => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? { ...o, status: newStatus, statusIndex: STATUS_STEPS.indexOf(newStatus) }
            : o
        )
      );
    },
    [setOrders]
  );

  return { orders, placeOrder, updateOrderStatus };
}

export default useOrders;
