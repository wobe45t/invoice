import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  UserIcon,
  NewspaperIcon,
  HomeIcon,
  PlusIcon,
  CogIcon,
  UsersIcon,
  MenuIcon,
  LogoutIcon,
  ChipIcon,
  AcademicCapIcon,
} from '@heroicons/react/outline'
import { classNames } from '../utils'
import { logout } from '../actions/users'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'

const NavItem = (props: {
  to?: string
  onClick?: Function
  icon: React.ReactElement
  text?: string
  expand: boolean
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [active, setActive] = useState<boolean>(false)
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false)

  useEffect(() => {
    if (location.pathname === props.to) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [location, props.to])

  return (
    <div
      className={classNames(
        'w-full p-3 mt-5 flex rounded-md text-left tracking-tight border-right cursor-pointer transition duration-300  hover:bg-slate-700/75 hover:scale-110'
      )}
      onClick={() => {
        if (props.to) {
          navigate(props.to)
          setActive(!active)
        } else {
          props.onClick!()
        }
      }}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      <div className={`w-full flex flex-row items-center`}>
        <div className={classNames(`text-white ${props.expand && 'mr-2'}`)}>
          {props.icon}
        </div>
        <div className='text-white'>{props.expand && props.text}</div>
      </div>
      {!props.expand && <Tooltip visible={tooltipVisible} text={props.text} />}
    </div>
  )
}

const Tooltip = (props: any) => {
  const { text, visible } = props

  if (!visible) return null
  return (
    <div className='absolute left-0 top-0 translate-x-16 bg-slate-100 border rounded-md z-10 p-2'>
      <span className='tracking-tight font-thin'>{text}</span>
    </div>
  )
}

export const Nav = () => {
  const navigate = useNavigate()
  const [expandMenu, setExpandMenu] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const handleLogout = () => {
    logout()
    queryClient.clear()
    navigate('/login')
  }
  const { t } = useTranslation()

  return (
    <div className='w-auto p-3 flex flex-col items-center bg-gray-800'>
      <NavItem
        icon={<MenuIcon className='w-5 h-5' />}
        // onClick={() => setExpandMenu(!expandMenu)}
        text={t('nav.expand')}
        expand={expandMenu}
      />
      {/* <NavItem
        icon={<HomeIcon className='w-5 h-5' />}
        to='/'
        text={t('nav.home')}
        expand={expandMenu}
      /> */}

      <NavItem
        icon={<NewspaperIcon className='w-5 h-5' />}
        to='/invoices'
        text={t('nav.invoices')}
        expand={expandMenu}
      />
      <NavItem
        icon={<PlusIcon className='w-5 h-5' />}
        to='/create-invoice'
        text={t('nav.createInvoice')}
        expand={expandMenu}
      />

      <NavItem
        icon={<ChipIcon className='w-5 h-5' />}
        to='/products'
        text={t('nav.products')}
        expand={expandMenu}
      />

      <NavItem
        icon={<UsersIcon className='w-5 h-5' />}
        to='/contractors'
        text={t('nav.contractors')}
        expand={expandMenu}
      />
      <div className='flex-1' />
      {/* <NavItem
        icon={<AcademicCapIcon className='w-5 h-5' />}
        to='/debug'
        text={t('nav.debug')}
        expand={expandMenu}
      /> */}
      <NavItem
        icon={<UserIcon className='w-5 h-5' />}
        to='/profile'
        text={t('nav.profile')}
        expand={expandMenu}
      />
      <NavItem
        icon={<CogIcon className='w-5 h-5' />}
        to='/settings'
        text={t('nav.settings')}
        expand={expandMenu}
      />
      <NavItem
        onClick={handleLogout}
        icon={<LogoutIcon className='w-5 h-5 ' />}
        text={t('nav.logout')}
        expand={expandMenu}
      />
    </div>
  )
}
