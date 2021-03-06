'use strict';

const primTypes = require('../../constants/primTypes');

const Text = require('../../store/factory/marks/Text');
const assets = require('../../util/assets');
const getInVis = require('../../util/immutable-utils').getInVis;

import * as React from 'react';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import {updateMarkProperty} from '../../actions/markActions';
import {State} from '../../store';
import {Property} from './Property';
import {TextAlignments, TextBaselines, TextFonts, TextFontStyles, TextFontWeights} from '../../store/factory/marks/Text';

interface OwnProps {
  primId?: number;
  primType: any; // TODO
  autoVal: string;

}

interface StateProps {
  dsId: number;
}

interface DispatchProps {
  updateTemplate: (value: any) => void
}

function mapStateToProps(reduxState: State, ownProps: OwnProps): StateProps {
  return {
    dsId: getInVis(reduxState, 'marks.' + ownProps.primId + '.from.data')
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
  return {
    updateTemplate: function(value) {
      const val = value.target ? value.target.value : value;
      dispatch(updateMarkProperty({property: 'properties.update.text.template', value: val}, ownProps.primId));
    }
  };
}

class BaseTextInspector extends React.Component<OwnProps & StateProps & DispatchProps> {
  public render() {
    const props = this.props;
    const dsId = props.dsId;
    const textLbl = (<h3 className='label'>Text</h3>);

    const textProp = dsId ? (
      <Property name='text.template' type='autocomplete' autoType='tmpl'
        dsId={dsId} onChange={props.updateTemplate} {...props}>
        {textLbl}
      </Property>
    ) : (
      <Property name='text.template' type='text'
        onChange={props.updateTemplate} {...props}>
        {textLbl}
      </Property>
    );

    return (
      <div>
        <div className='property-group'>
          {textProp}
        </div>

        <div className='property-group'>
          <h3>Font</h3>

          <Property name='font' label='Face' type='select'
            opts={TextFonts} canDrop={true} {...props} />

          <Property name='fontSize' label='Size' type='number'
            canDrop={true} {...props} />

          <Property name='fontWeight' label='Weight' type='toggle'
            glyph={assets.bold} opts={TextFontWeights}
            canDrop={true} {...props} />

          <Property name='fontStyle' label='Style' type='toggle'
            glyph={assets.italic} opts={TextFontStyles}
            canDrop={true} {...props} />

          <Property name='fill' label='Color' type='color'
            canDrop={true} {...props} />

          <Property name='fillOpacity' label='Opacity' type='range'
            min='0' max='1' step='0.05' canDrop={true} {...props} />
        </div>

        <div className='property-group'>
          <h3>Position</h3>

          <Property name='x' label='X' type='number' canDrop={true} {...props} />

          <Property name='y' label='Y' type='number' canDrop={true} {...props} />
        </div>

        <div className='property-group'>
          <h3>Offset</h3>

          <Property name='dx' label='X' type='number' canDrop={true} {...props} />

          <Property name='dy' label='Y' type='number' canDrop={true} {...props} />

        </div>

        <div className='property-group'>
          <h3>Align</h3>

          <Property name='align' label='Horizontal' type='selection'
            glyphs={[assets['align-left'],
                     assets['align-center'], assets['align-right']]}
            opts={TextAlignments} canDrop={true} {...props} />

          <Property name='baseline' label='Vertical' type='selection'
            glyphs={[assets['vertical-align-top'],
                     assets['vertical-align-center'], assets['vertical-align-bottom']]}
            opts={TextBaselines} canDrop={true} {...props} />

          <Property name='angle' label='Rotation' type='number'
            canDrop={true} {...props} />
        </div>
      </div>
    );
  }
};

export const TextInspector = connect(mapStateToProps, mapDispatchToProps)(BaseTextInspector);
