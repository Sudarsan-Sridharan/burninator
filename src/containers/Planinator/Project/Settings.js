import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import * as M from '@cjdev/visual-stack/lib/components/Modal';
import { openModal, closeModal } from '@cjdev/visual-stack-redux';
import { SettingsIcon } from '../../../components/Icons';
import { BasicButton } from '../../../components/Button';
import { Spinner } from '../../../components/Spinner';
import { putPlan, getPlan } from '../api';
import Context from '../context';

const getSettingsForm = projectSettings => {
  switch (projectSettings.phase) {
    case 'launch':
      return {
        body: (
          <div>
            {projectSettings.phase}
            <ul>
              <li>what action can be taken on a launch project?</li>
              <li>rename</li>
              <li>start/end</li>
              <li>delete</li>
              <li>change phase?</li>
            </ul>
          </div>
        ),
        onSave: () => {
          console.log('save');
        },
      };
    case 'assess':
      return {
        body: (
          <div>
            {projectSettings.phase}
            <ul>
              <li>what action can be taken on an assess project?</li>
              <li>rename</li>
              <li>start/end</li>
              <li>delete</li>
              <li>change phase?</li>
            </ul>
          </div>
        ),
        onSave: () => {
          console.log('save');
        },
      };
    case 'design':
      return {
        body: (
          <div>
            {projectSettings.phase}
            <ul>
              <li>what action can be taken on a design project?</li>
              <li>rename</li>
              <li>start/end</li>
              <li>delete</li>
              <li>change phase?</li>
            </ul>
          </div>
        ),
        onSave: () => {
          console.log('save');
        },
      };
    case 'build':
      return {
        body: (
          <div>
            {projectSettings.phase}
            <ul>
              <li>what action can be taken on a build project?</li>
              <li>add/remove versions from the attached board</li>
              <li>rename</li>
              <li>delete</li>
              <li>change phase?</li>
            </ul>
          </div>
        ),
        onSave: () => {
          console.log('save');
        },
      };
    case 'complete':
      return {
        body: (
          <div>
            {projectSettings.phase}
            <ul>
              <li>what action can be taken on a completed project?</li>
              <li>rename</li>
              <li>delete</li>
              <li>change phase?</li>
            </ul>
          </div>
        ),
        onSave: () => {
          console.log('save');
        },
      };
    default:
      throw Error(`Unknown phase:${projectSettings.phase}`);
  }
};

const ProjectSettingsModal = ({ closeModal, projectSettings }) => {
  const { state, dispatch, planId, version } = useContext(Context);
  const { settings, tracks, putApiMeta } = state;
  const { error, loading } = putApiMeta;
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (updating && !putApiMeta.loading && !putApiMeta.error) {
      closeModal();
      getPlan(planId, version, dispatch);
      setUpdating(false);
    }
  }, [updating, closeModal, putApiMeta, planId, version, dispatch]);

  const form = getSettingsForm(projectSettings);

  return (
    <M.Modal onBackgroundClick={closeModal}>
      <M.Dialog>
        <M.Content>
          <M.Header title={`Settings: ${projectSettings.name}`} />
          <M.Body>{form.body}</M.Body>
          <M.Footer>
            <span>{error}</span>
            <BasicButton type="text" onClick={closeModal}>
              Cancel
            </BasicButton>
            <BasicButton
              type="outline-secondary"
              onClick={() => {
                setUpdating(true);
                // TODO: move action to specific handlers...
                // form.onSave(...);
                putPlan(planId, { settings, tracks }, dispatch);
              }}
            >
              Save
              {loading && <Spinner />}
            </BasicButton>
          </M.Footer>
        </M.Content>
      </M.Dialog>
    </M.Modal>
  );
};
ProjectSettingsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  projectSettings: PropTypes.shape({
    name: PropTypes.string,
    phase: PropTypes.string,
  }),
};

export const SettingsButtonPure = ({ hover, openModal, closeModal, projectSettings, ...props }) => {
  return (
    <span onClick={() => openModal(ProjectSettingsModal, { closeModal, projectSettings })}>
      <SettingsIcon
        css={`
          ${hover ? `fill: currentColor;` : `fill: transparent`}
          &:hover {
            fill: #ddd;
          }
          &:active {
            fill: #bbb;
          }
        `}
        size={1}
        {...props}
      />
    </span>
  );
};
SettingsButtonPure.propTypes = {
  hover: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  projectSettings: PropTypes.shape({
    name: PropTypes.string,
    phase: PropTypes.string,
  }),
};

export const SettingsButton = connect(
  null,
  { openModal, closeModal }
)(SettingsButtonPure);
