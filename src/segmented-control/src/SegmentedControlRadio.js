import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Box, { css } from 'ui-box'
import { colors } from '../../colors'
import { Text } from '../../typography'
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight
} from '../../shared-styles'
import SegmentedControlAppearances from './styles/SegmentedControlAppearances'

const keysSegmentedControlAppearances = Object.keys(SegmentedControlAppearances)

const labelClass = css({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
})

const wrapperClass = css({
  position: 'relative',
  display: 'flex',
  flex: 1,
  cursor: 'pointer',
  marginLeft: '-1px',
  [`:first-child .${labelClass}`]: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3
  },
  [`:last-child .${labelClass}`]: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3
  }
})

const offscreenCss = css({
  overflow: 'hidden',
  position: 'absolute',
  height: '1px',
  width: '1px',
  padding: 0,
  margin: '-1px',
  border: 0,
  clip: 'rect(0 0 0 0)'
})

export default class SegmentedControlRadio extends PureComponent {
  static propTypes = {
    /**
     * The name attribute of the radio input.
     */
    name: PropTypes.string.isRequired,

    /**
     * The label used for the radio.
     */
    label: PropTypes.node.isRequired,

    /**
     * The value attribute of the radio input.
     */
    value: PropTypes.string.isRequired,

    /**
     * The height of the control.
     */
    height: PropTypes.number.isRequired,

    /**
     * When true, the radio input is checked.
     */
    checked: PropTypes.bool.isRequired,

    /**
     * Function called when the state changes.
     */
    onChange: PropTypes.func.isRequired,

    /**
     * The appearance of the control. Currently only `default` is possible.
     */
    appearance: PropTypes.oneOf(keysSegmentedControlAppearances).isRequired,

    /**
     * When true, this item is the first item.
     */
    isFirstItem: PropTypes.bool,

    /**
     * When true, this item is the last item.
     */
    isLastItem: PropTypes.bool
  }

  render() {
    const {
      name,
      label,
      value,
      height,
      checked,
      onChange,
      appearance,
      isFirstItem,
      isLastItem
    } = this.props

    const textSize = getTextSizeForControlHeight({ height })
    const borderRadius = getBorderRadiusForControlHeight({ height })
    const styles = SegmentedControlAppearances[appearance]

    return (
      <Box
        is="label"
        className={`${wrapperClass}`}
        css={styles}
        {...(checked
          ? {
              'data-active': true
            }
          : {})}
        {...(isFirstItem
          ? {
              borderTopLeftRadius: borderRadius,
              borderBottomLeftRadius: borderRadius
            }
          : {})}
        {...(isLastItem
          ? {
              borderTopRightRadius: borderRadius,
              borderBottomRightRadius: borderRadius
            }
          : {})}
      >
        <input
          type="radio"
          className={`${offscreenCss}`}
          name={name}
          value={value}
          checked={checked}
          onChange={e => onChange(e.target.value)}
        />
        <Text
          fontWeight={500}
          size={textSize}
          className={`${labelClass}`}
          {...(checked ? { color: colors.blue['500'] } : {})}
        >
          {label}
        </Text>
      </Box>
    )
  }
}
