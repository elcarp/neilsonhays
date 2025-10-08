'use client'

import PageTitle from '@/components/ui/page-title'
import { CheckIcon } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const includedFeatures = [
  'Free admission to Library and access to over 22,000 books, with borrowing abilities (max. 15 at a time)',
  "Free entry to children's weekly story time",
  'First booking opportunities and 15 % off concerts at the library',
  '10 % discount on Library merchandise',
  '10 % discount at the café',
  'Members - only preview to bi-annual book sales',
  'Member - exclusive book club',
  'Regular newsletter with exclusive announcements',
  'A nine-to-five co-working space',
  'The good feeling that comes with supporting a community landmark!',
]

export default function Membership() {
  const { addItem } = useCart()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleIndividualMembershipPurchase = async () => {
    try {
      setIsLoading(true)

      // Create mock products for the membership items
      const securityDeposit = {
        id: 999001, // Mock ID for security deposit
        name: 'Refundable Security Deposit',
        slug: 'refundable-security-deposit',
        price: '500',
        regular_price: '500',
        sale_price: '',
        on_sale: false,
        status: 'publish' as const,
        stock_status: 'instock' as const,
        description: 'Refundable security deposit for library membership',
        short_description: 'Refundable security deposit',
        images: [],
        categories: [{ id: 1, name: 'Membership', slug: 'membership' }],
        tags: [],
        purchasable: true,
        virtual: true,
        downloadable: false,
        featured: false,
        catalog_visibility: 'visible' as const,
        sku: 'SEC-DEP-001',
        total_sales: 0,
        external_url: '',
        button_text: '',
        tax_status: 'taxable' as const,
        tax_class: '',
        manage_stock: false,
        stock_quantity: null,
        backorders: 'no' as const,
        backorders_allowed: false,
        backordered: false,
        sold_individually: false,
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        shipping_required: false,
        shipping_taxable: false,
        shipping_class: '',
        shipping_class_id: 0,
        reviews_allowed: true,
        average_rating: '0',
        rating_count: 0,
        related_ids: [],
        upsell_ids: [],
        cross_sell_ids: [],
        parent_id: 0,
        purchase_note: '',
        attributes: [],
        default_attributes: [],
        variations: [],
        grouped_products: [],
        menu_order: 0,
        meta_data: [],
        permalink: '',
        date_created: '',
        date_modified: '',
        type: 'simple' as const,
        downloads: [],
        download_limit: -1,
        download_expiry: -1,
      }

      const adultMembership = {
        id: 999002, // Mock ID for adult membership
        name: 'Single Adult New 1 Year Membership',
        slug: 'single-adult-new-1-year',
        price: '2500',
        regular_price: '2500',
        sale_price: '',
        on_sale: false,
        status: 'publish' as const,
        stock_status: 'instock' as const,
        description: 'Annual membership for single adult',
        short_description: 'Single adult annual membership',
        images: [],
        categories: [{ id: 1, name: 'Membership', slug: 'membership' }],
        tags: [],
        purchasable: true,
        virtual: true,
        downloadable: false,
        featured: false,
        catalog_visibility: 'visible' as const,
        sku: 'MEM-ADULT-001',
        total_sales: 0,
        external_url: '',
        button_text: '',
        tax_status: 'taxable' as const,
        tax_class: '',
        manage_stock: false,
        stock_quantity: null,
        backorders: 'no' as const,
        backorders_allowed: false,
        backordered: false,
        sold_individually: false,
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        shipping_required: false,
        shipping_taxable: false,
        shipping_class: '',
        shipping_class_id: 0,
        reviews_allowed: true,
        average_rating: '0',
        rating_count: 0,
        related_ids: [],
        upsell_ids: [],
        cross_sell_ids: [],
        parent_id: 0,
        purchase_note: '',
        attributes: [],
        default_attributes: [],
        variations: [],
        grouped_products: [],
        menu_order: 0,
        meta_data: [],
        permalink: '',
        date_created: '',
        date_modified: '',
        type: 'simple' as const,
        downloads: [],
        download_limit: -1,
        download_expiry: -1,
      }

      // Add both products to cart
      addItem(securityDeposit, 1)
      addItem(adultMembership, 1)

      // Navigate to cart page
      router.push('/cart')
    } catch (error) {
      console.error('Error adding membership to cart:', error)
      // Fallback to mailto if something goes wrong
      window.location.href = 'mailto:info@neilsonhayslibrary.org'
    } finally {
      setIsLoading(false)
    }
  }

  const handleSeniorMembershipPurchase = async () => {
    try {
      setIsLoading(true)

      // Create mock products for the senior membership items
      const securityDeposit = {
        id: 999001, // Mock ID for security deposit (same as individual)
        name: 'Refundable Security Deposit',
        slug: 'refundable-security-deposit',
        price: '500',
        regular_price: '500',
        sale_price: '',
        on_sale: false,
        status: 'publish' as const,
        stock_status: 'instock' as const,
        description: 'Refundable security deposit for library membership',
        short_description: 'Refundable security deposit',
        images: [],
        categories: [{ id: 1, name: 'Membership', slug: 'membership' }],
        tags: [],
        purchasable: true,
        virtual: true,
        downloadable: false,
        featured: false,
        catalog_visibility: 'visible' as const,
        sku: 'SEC-DEP-001',
        total_sales: 0,
        external_url: '',
        button_text: '',
        tax_status: 'taxable' as const,
        tax_class: '',
        manage_stock: false,
        stock_quantity: null,
        backorders: 'no' as const,
        backorders_allowed: false,
        backordered: false,
        sold_individually: false,
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        shipping_required: false,
        shipping_taxable: false,
        shipping_class: '',
        shipping_class_id: 0,
        reviews_allowed: true,
        average_rating: '0',
        rating_count: 0,
        related_ids: [],
        upsell_ids: [],
        cross_sell_ids: [],
        parent_id: 0,
        purchase_note: '',
        attributes: [],
        default_attributes: [],
        variations: [],
        grouped_products: [],
        menu_order: 0,
        meta_data: [],
        permalink: '',
        date_created: '',
        date_modified: '',
        type: 'simple' as const,
        downloads: [],
        download_limit: -1,
        download_expiry: -1,
      }

      const seniorMembership = {
        id: 999003, // Mock ID for senior membership
        name: 'Senior Citizen New 1 Year Membership',
        slug: 'senior-citizen-new-1-year',
        price: '1850',
        regular_price: '1850',
        sale_price: '',
        on_sale: false,
        status: 'publish' as const,
        stock_status: 'instock' as const,
        description: 'Annual membership for senior citizens over 65',
        short_description: 'Senior citizen annual membership',
        images: [],
        categories: [{ id: 1, name: 'Membership', slug: 'membership' }],
        tags: [],
        purchasable: true,
        virtual: true,
        downloadable: false,
        featured: false,
        catalog_visibility: 'visible' as const,
        sku: 'MEM-SENIOR-001',
        total_sales: 0,
        external_url: '',
        button_text: '',
        tax_status: 'taxable' as const,
        tax_class: '',
        manage_stock: false,
        stock_quantity: null,
        backorders: 'no' as const,
        backorders_allowed: false,
        backordered: false,
        sold_individually: false,
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        shipping_required: false,
        shipping_taxable: false,
        shipping_class: '',
        shipping_class_id: 0,
        reviews_allowed: true,
        average_rating: '0',
        rating_count: 0,
        related_ids: [],
        upsell_ids: [],
        cross_sell_ids: [],
        parent_id: 0,
        purchase_note: '',
        attributes: [],
        default_attributes: [],
        variations: [],
        grouped_products: [],
        menu_order: 0,
        meta_data: [],
        permalink: '',
        date_created: '',
        date_modified: '',
        type: 'simple' as const,
        downloads: [],
        download_limit: -1,
        download_expiry: -1,
      }

      // Add both products to cart
      addItem(securityDeposit, 1)
      addItem(seniorMembership, 1)

      // Navigate to cart page
      router.push('/cart')
    } catch (error) {
      console.error('Error adding senior membership to cart:', error)
      // Fallback to mailto if something goes wrong
      window.location.href = 'mailto:info@neilsonhayslibrary.org'
    } finally {
      setIsLoading(false)
    }
  }

  const handleChildMembershipPurchase = async () => {
    try {
      setIsLoading(true)

      // Create mock products for the child membership items
      const securityDeposit = {
        id: 999001, // Mock ID for security deposit (same as others)
        name: 'Refundable Security Deposit',
        slug: 'refundable-security-deposit',
        price: '500',
        regular_price: '500',
        sale_price: '',
        on_sale: false,
        status: 'publish' as const,
        stock_status: 'instock' as const,
        description: 'Refundable security deposit for library membership',
        short_description: 'Refundable security deposit',
        images: [],
        categories: [{ id: 1, name: 'Membership', slug: 'membership' }],
        tags: [],
        purchasable: true,
        virtual: true,
        downloadable: false,
        featured: false,
        catalog_visibility: 'visible' as const,
        sku: 'SEC-DEP-001',
        total_sales: 0,
        external_url: '',
        button_text: '',
        tax_status: 'taxable' as const,
        tax_class: '',
        manage_stock: false,
        stock_quantity: null,
        backorders: 'no' as const,
        backorders_allowed: false,
        backordered: false,
        sold_individually: false,
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        shipping_required: false,
        shipping_taxable: false,
        shipping_class: '',
        shipping_class_id: 0,
        reviews_allowed: true,
        average_rating: '0',
        rating_count: 0,
        related_ids: [],
        upsell_ids: [],
        cross_sell_ids: [],
        parent_id: 0,
        purchase_note: '',
        attributes: [],
        default_attributes: [],
        variations: [],
        grouped_products: [],
        menu_order: 0,
        meta_data: [],
        permalink: '',
        date_created: '',
        date_modified: '',
        type: 'simple' as const,
        downloads: [],
        download_limit: -1,
        download_expiry: -1,
      }

      const childMembership = {
        id: 999004, // Mock ID for child membership
        name: 'Child New 1 Year Membership',
        slug: 'child-new-1-year',
        price: '1850',
        regular_price: '1850',
        sale_price: '',
        on_sale: false,
        status: 'publish' as const,
        stock_status: 'instock' as const,
        description: 'Annual membership for children under 12',
        short_description: 'Child annual membership',
        images: [],
        categories: [{ id: 1, name: 'Membership', slug: 'membership' }],
        tags: [],
        purchasable: true,
        virtual: true,
        downloadable: false,
        featured: false,
        catalog_visibility: 'visible' as const,
        sku: 'MEM-CHILD-001',
        total_sales: 0,
        external_url: '',
        button_text: '',
        tax_status: 'taxable' as const,
        tax_class: '',
        manage_stock: false,
        stock_quantity: null,
        backorders: 'no' as const,
        backorders_allowed: false,
        backordered: false,
        sold_individually: false,
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        shipping_required: false,
        shipping_taxable: false,
        shipping_class: '',
        shipping_class_id: 0,
        reviews_allowed: true,
        average_rating: '0',
        rating_count: 0,
        related_ids: [],
        upsell_ids: [],
        cross_sell_ids: [],
        parent_id: 0,
        purchase_note: '',
        attributes: [],
        default_attributes: [],
        variations: [],
        grouped_products: [],
        menu_order: 0,
        meta_data: [],
        permalink: '',
        date_created: '',
        date_modified: '',
        type: 'simple' as const,
        downloads: [],
        download_limit: -1,
        download_expiry: -1,
      }

      // Add both products to cart
      addItem(securityDeposit, 1)
      addItem(childMembership, 1)

      // Navigate to cart page
      router.push('/cart')
    } catch (error) {
      console.error('Error adding child membership to cart:', error)
      // Fallback to mailto if something goes wrong
      window.location.href = 'mailto:info@neilsonhayslibrary.org'
    } finally {
      setIsLoading(false)
    }
  }

  const handleFamilyMembershipPurchase = async () => {
    try {
      setIsLoading(true)

      // Try to fetch the real family membership product from WooCommerce
      let familyProduct = null
      try {
        const response = await fetch('/api/products/family-new-1-year')
        if (response.ok) {
          const data = await response.json()
          familyProduct = data.product
        }
      } catch {
        console.log('Could not fetch family product from API, using fallback')
      }

      // Create security deposit (same as other memberships)
      const securityDeposit = {
        id: 999001, // Mock ID for security deposit
        name: 'Refundable Security Deposit',
        slug: 'refundable-security-deposit',
        price: '500',
        regular_price: '500',
        sale_price: '',
        on_sale: false,
        status: 'publish' as const,
        stock_status: 'instock' as const,
        description: 'Refundable security deposit for library membership',
        short_description: 'Refundable security deposit',
        images: [],
        categories: [{ id: 1, name: 'Membership', slug: 'membership' }],
        tags: [],
        purchasable: true,
        virtual: true,
        downloadable: false,
        featured: false,
        catalog_visibility: 'visible' as const,
        sku: 'SEC-DEP-001',
        total_sales: 0,
        external_url: '',
        button_text: '',
        tax_status: 'taxable' as const,
        tax_class: '',
        manage_stock: false,
        stock_quantity: null,
        backorders: 'no' as const,
        backorders_allowed: false,
        backordered: false,
        sold_individually: false,
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        shipping_required: false,
        shipping_taxable: false,
        shipping_class: '',
        shipping_class_id: 0,
        reviews_allowed: true,
        average_rating: '0',
        rating_count: 0,
        related_ids: [],
        upsell_ids: [],
        cross_sell_ids: [],
        parent_id: 0,
        purchase_note: '',
        attributes: [],
        default_attributes: [],
        variations: [],
        grouped_products: [],
        menu_order: 0,
        meta_data: [],
        permalink: '',
        date_created: '',
        date_modified: '',
        type: 'simple' as const,
        downloads: [],
        download_limit: -1,
        download_expiry: -1,
      }

      // Use real product if available, otherwise create mock
      const familyMembership = familyProduct || {
        id: 999005, // Mock ID for family membership
        name: 'Family New 1 Year Membership',
        slug: 'family-new-1-year',
        price: '3500',
        regular_price: '3500',
        sale_price: '',
        on_sale: false,
        status: 'publish' as const,
        stock_status: 'instock' as const,
        description: 'Annual membership for families',
        short_description: 'Family annual membership',
        images: [],
        categories: [{ id: 1, name: 'Membership', slug: 'membership' }],
        tags: [],
        purchasable: true,
        virtual: true,
        downloadable: false,
        featured: false,
        catalog_visibility: 'visible' as const,
        sku: 'MEM-FAMILY-001',
        total_sales: 0,
        external_url: '',
        button_text: '',
        tax_status: 'taxable' as const,
        tax_class: '',
        manage_stock: false,
        stock_quantity: null,
        backorders: 'no' as const,
        backorders_allowed: false,
        backordered: false,
        sold_individually: false,
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        shipping_required: false,
        shipping_taxable: false,
        shipping_class: '',
        shipping_class_id: 0,
        reviews_allowed: true,
        average_rating: '0',
        rating_count: 0,
        related_ids: [],
        upsell_ids: [],
        cross_sell_ids: [],
        parent_id: 0,
        purchase_note: '',
        attributes: [],
        default_attributes: [],
        variations: [],
        grouped_products: [],
        menu_order: 0,
        meta_data: [],
        permalink: '',
        date_created: '',
        date_modified: '',
        type: 'simple' as const,
        downloads: [],
        download_limit: -1,
        download_expiry: -1,
      }

      // Add both products to cart
      addItem(securityDeposit, 1)
      addItem(familyMembership, 1)

      // Navigate to cart page
      router.push('/cart')
    } catch (error) {
      console.error('Error adding family membership to cart:', error)
      // Fallback to mailto if something goes wrong
      window.location.href = 'mailto:info@neilsonhayslibrary.org'
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='bg-teal-700 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <PageTitle
          title='Membership'
          description='Join the Community'
          quote='The only thing that you absolutely have to know, is the location of the library. — Albert Einstein'
        />
        <div className='bg-white mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none'>
          <div className='p-8 sm:p-10 lg:flex-auto'>
            <h3 className='text-3xl font-semibold tracking-tight text-gray-900'>
              Annual Membership
            </h3>
            <p className='mt-6 text-base/7 text-gray-600'>
              Find refuge from the busy city among the pillars and pages of the
              Neilson Hays Library.
            </p>
            <p className='mt-3 text-base/7 text-gray-600'>
              Built in 1921 The Neilson Hays Library is one of the region’s
              earliest libraries and one of the few still going strong. An
              extraordinary history, an impressive borrowing collection and a
              historic building make this a unique place to read, to write and
              to be inspired.
            </p>
            <div className='mt-10 flex items-center gap-x-4'>
              <h4 className='flex-none text-sm/6 font-semibold text-teal-600'>
                What&apos;s included
              </h4>
              <div className='h-px flex-auto bg-gray-100' />
            </div>
            <ul
              role='list'
              className='mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6'
            >
              {includedFeatures.map(feature => (
                <li key={feature} className='flex gap-x-3'>
                  <CheckIcon
                    aria-hidden='true'
                    className='h-6 w-5 flex-none text-teal-600'
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className='-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0'>
            <div className='rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-gray-900/5 ring-inset lg:flex lg:flex-col lg:justify-center lg:py-16'>
              <div className='mx-auto max-w-xs px-8'>
                <div className='membership'>
                  <p className='text-base font-semibold text-gray-600'>
                    Individual
                  </p>
                  <p className='mt-6 flex items-baseline justify-center gap-x-2'>
                    <span className='text-5xl font-semibold tracking-tight text-gray-900'>
                      2,500
                    </span>
                    <span className='text-sm/6 font-semibold tracking-wide text-gray-600'>
                      THB
                    </span>
                  </p>
                  <button
                    onClick={handleIndividualMembershipPurchase}
                    disabled={isLoading}
                    className='mt-10 block w-full rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                  >
                    {isLoading ? 'Adding to cart...' : 'Get access'}
                  </button>
                </div>
                <div className='membership mt-12'>
                  <p className='text-base font-semibold text-gray-600'>
                    Senior Over 65 or Children Under 12 with ID
                  </p>
                  <p className='mt-6 flex items-baseline justify-center gap-x-2'>
                    <span className='text-5xl font-semibold tracking-tight text-gray-900'>
                      1,850
                    </span>
                    <span className='text-sm/6 font-semibold tracking-wide text-gray-600'>
                      THB
                    </span>
                  </p>
                  <button
                    onClick={handleSeniorMembershipPurchase}
                    disabled={isLoading}
                    className='mt-10 block w-full rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                  >
                    {isLoading ? 'Adding to cart...' : 'Senior Over 65'}
                  </button>
                  <button
                    onClick={handleChildMembershipPurchase}
                    disabled={isLoading}
                    className='mt-4 block w-full rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                  >
                    {isLoading ? 'Adding to cart...' : 'Child Under 12'}
                  </button>
                </div>
                <div className='membership mt-12'>
                  <p className='text-base font-semibold text-gray-600'>
                    Family
                  </p>
                  <p className='mt-6 flex items-baseline justify-center gap-x-2'>
                    <span className='text-5xl font-semibold tracking-tight text-gray-900'>
                      3,500
                    </span>
                    <span className='text-sm/6 font-semibold tracking-wide text-gray-600'>
                      THB
                    </span>
                  </p>
                  <button
                    onClick={handleFamilyMembershipPurchase}
                    disabled={isLoading}
                    className='mt-10 block w-full rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                  >
                    {isLoading ? 'Adding to cart...' : 'Get access'}
                  </button>
                </div>
                <p className='mt-6 text-xs/5 text-gray-600'>
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
