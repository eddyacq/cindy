import { useState, useEffect, useCallback } from 'react'
import { Package, Loader2, Check } from 'lucide-react'
import PropTypes from 'prop-types'
import { AdminSidebar } from '../../components/admin/AdminSidebar'
import { adminService } from '../../services/adminService'
import { useToast } from '../../context/ToastContext'

const STATUS_ORDER = ['order_placed', 'payment_confirmed', 'preparing', 'shipped', 'out_for_delivery', 'delivered']

const STATUS_LABELS = {
  order_placed: 'Order Placed',
  payment_confirmed: 'Payment Confirmed',
  preparing: 'Preparing Order',
  shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
}

const PAYMENT_COLOR = {
  paid: 'text-green-600 bg-green-50',
  pending: 'text-amber-600 bg-amber-50',
  failed: 'text-red-600 bg-red-50',
}

function OrderStepper({ status }) {
  const currentIndex = STATUS_ORDER.indexOf(status)
  return (
    <div className="flex items-center overflow-x-auto pb-1">
      {STATUS_ORDER.map((s, i) => (
        <div key={s} className="flex items-center shrink-0">
          <div className="flex flex-col items-center w-20 text-center">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition ${
              i < currentIndex ? 'bg-primary-600 text-white'
              : i === currentIndex ? 'bg-primary-600 text-white ring-4 ring-primary-100'
              : 'bg-gray-100 text-gray-400'
            }`}>
              {i < currentIndex ? <Check size={14} /> : i + 1}
            </div>
            <p className={`text-[11px] mt-1.5 leading-tight ${i <= currentIndex ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
              {STATUS_LABELS[s]}
            </p>
          </div>
          {i < STATUS_ORDER.length - 1 && (
            <div className={`h-0.5 w-8 -mt-5 ${i < currentIndex ? 'bg-primary-600' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

OrderStepper.propTypes = {
  status: PropTypes.string.isRequired,
}

function OrderRow({ order, onStatusChanged }) {
  const { showToast } = useToast()
  const [selected, setSelected] = useState(order.deliveryStatus)
  const [saving, setSaving] = useState(false)

  const canUpdateDelivery = order.paymentStatus === 'paid'

  const handleUpdate = async () => {
    if (selected === order.deliveryStatus) return
    setSaving(true)
    try {
      const res = await adminService.updateOrderStatus(order.id, selected)
      onStatusChanged(order.id, res.data.deliveryStatus)
      showToast('Order status updated.')
    } catch (err) {
      showToast(err.message || 'Could not update order status.', 'error')
      setSelected(order.deliveryStatus)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-semibold text-gray-900">Order #{order.id}</p>
          <p className="text-sm text-gray-500">
            {order.customer.firstName} {order.customer.lastName} &middot; {order.customer.email}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <div className="text-right">
          <span className={`badge capitalize ${PAYMENT_COLOR[order.paymentStatus] || 'text-gray-600 bg-gray-50'}`}>{order.paymentStatus}</span>
          <p className="font-semibold text-gray-900 mt-2">GH₵ {order.total.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <Package size={16} /> {order.itemCount} Items
      </div>

      <div className="border-t border-gray-100 pt-4">
        <OrderStepper status={order.deliveryStatus} />
      </div>

      {canUpdateDelivery ? (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="input w-auto"
          >
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
          <button
            onClick={handleUpdate}
            disabled={saving || selected === order.deliveryStatus}
            className="btn-primary px-4 py-2.5 text-sm"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : 'Update Status'}
          </button>
        </div>
      ) : (
        <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
          Delivery status can be updated once payment is confirmed.
        </p>
      )}
    </div>
  )
}

OrderRow.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    paymentStatus: PropTypes.string.isRequired,
    deliveryStatus: PropTypes.string.isRequired,
    itemCount: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    customer: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onStatusChanged: PropTypes.func.isRequired,
}

export function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 })
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchOrders = useCallback((page = 1) => {
    setLoading(true)
    adminService.listOrders({ status: statusFilter || undefined, page, limit: 10 })
      .then((res) => {
        setOrders(res.data)
        setPagination(res.pagination)
      })
      .finally(() => setLoading(false))
  }, [statusFilter])

  useEffect(() => { fetchOrders(1) }, [fetchOrders])

  const handleStatusChanged = (orderId, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, deliveryStatus: newStatus } : o)))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1"><AdminSidebar /></aside>

        <div className="lg:col-span-3 space-y-4">
          <div className="card p-4 flex items-center gap-3">
            <label className="text-sm text-gray-600 font-medium">Filter by status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input w-auto"
            >
              <option value="">All statuses</option>
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24 text-gray-400">
              <Loader2 size={28} className="animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="card p-10 text-center text-gray-400">No orders found.</div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} onStatusChanged={handleStatusChanged} />
              ))}
            </div>
          )}

          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-2">
              {Array.from({ length: pagination.totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => fetchOrders(i + 1)}
                  className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                    pagination.page === i + 1 ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
