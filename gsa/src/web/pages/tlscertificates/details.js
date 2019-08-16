/* Copyright (C) 2019 Greenbone Networks GmbH
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
import React from 'react';

import {connect} from 'react-redux';

import _ from 'gmp/locale';

import {isDefined} from 'gmp/utils/identity';

import InfoTable from 'web/components/table/infotable';
import TableData from 'web/components/table/data';
import TableBody from 'web/components/table/body';
import TableRow from 'web/components/table/row';

import {Col} from 'web/entity/page';

import {
  loadEntity as loadTlsCertificate,
  selector as tlsCertificateSelector,
} from 'web/store/entities/tlscertificates';

import compose from 'web/utils/compose';
import withGmp from 'web/utils/withGmp';
import PropTypes from 'web/utils/proptypes';
import {renderYesNo} from 'web/utils/render';

const TlsCertificateDetails = ({entity, links = true}) => {
  return (
    <React.Fragment>
      <InfoTable>
        <colgroup>
          <Col width="10%" />
          <Col width="90%" />
        </colgroup>
        <TableBody>
          {isDefined(entity.comment) && (
            <TableRow>
              <TableData>{_('Comment')}</TableData>
              <TableData>{entity.comment}</TableData>
            </TableRow>
          )}
          {isDefined(entity.trust) && (
            <TableRow>
              <TableData>{_('Trusted')}</TableData>
              <TableData>{renderYesNo(entity.trust)}</TableData>
            </TableRow>
          )}
          {isDefined(entity.valid) && (
            <TableRow>
              <TableData>{_('Valid')}</TableData>
              <TableData>{renderYesNo(entity.valid)}</TableData>
            </TableRow>
          )}
        </TableBody>
      </InfoTable>
    </React.Fragment>
  );
};

TlsCertificateDetails.propTypes = {
  entity: PropTypes.model.isRequired,
  links: PropTypes.bool.isRequired,
};

const mapStateToProps = (rootState, {entity = {}}) => {
  const tlsCertificateSel = tlsCertificateSelector(rootState);
  return {
    tlsCertificate: tlsCertificateSel.getEntity(entity.id),
  };
};

const mapDispatchToProps = (dispatch, {gmp}) => ({
  loadTlsCertificate: id => dispatch(loadTlsCertificate(gmp)(id)),
});

export default compose(
  withGmp,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(TlsCertificateDetails);

// vim: set ts=2 sw=2 tw=80: