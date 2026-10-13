import React, { useState } from 'react';
import type { Page, ShareSettings, Collaborator } from '../../types';
import { translations } from '../../i18n/translations';
import {
  ShareIcon, CopyIcon, CheckIcon, GlobeIcon,
  LockIcon, UserPlus, TrashIcon, ExternalLink
} from '../icons/HugeIcons';
import { AxiomDropdown } from '../Common/AxiomDropdown';

interface Props {
  page: Page;
  isOpen: boolean;
  onClose: () => void;
  onUpdateShareSettings: (settings: ShareSettings) => void;
  onTogglePublicPreview: () => void;
  isPublicPreviewActive: boolean;
  isRtl?: boolean;
}

export const ShareModal: React.FC<Props> = ({
  page,
  isOpen,
  onClose,
  onUpdateShareSettings,
  onTogglePublicPreview,
  isPublicPreviewActive,
  isRtl
}) => {
  const [copied, setCopied] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'editor' | 'viewer'>('viewer');

  if (!isOpen) return null;

  const t = isRtl ? translations.ar : translations.en;
  const settings = page.shareSettings;
  const shareUrl = `${window.location.origin}/#share=${settings.shareId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleGeneralAccessChange = (access: 'restricted' | 'anyone_with_link') => {
    onUpdateShareSettings({
      ...settings,
      generalAccess: access,
      isPublicLinkActive: access === 'anyone_with_link'
    });
  };

  const handleLinkRoleChange = (role: 'viewer' | 'commenter' | 'editor') => {
    onUpdateShareSettings({
      ...settings,
      linkRole: role
    });
  };

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newEmail.includes('@')) return;

    const newCollaborator: Collaborator = {
      email: newEmail.trim(),
      name: newEmail.split('@')[0],
      role: newRole
    };

    onUpdateShareSettings({
      ...settings,
      collaborators: [...settings.collaborators, newCollaborator]
    });

    setNewEmail('');
  };

  const handleRemoveCollaborator = (email: string) => {
    onUpdateShareSettings({
      ...settings,
      collaborators: settings.collaborators.filter(c => c.email !== email)
    });
  };

  return (
    <div className="ax-modal-backdrop" onClick={onClose}>
      <div className="ax-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              display: 'flex',
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-accent-soft)',
              color: 'var(--color-accent)'
            }}>
              <ShareIcon size={20} />
            </span>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{t.shareModalTitle}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t.shareModalSubtitle}</p>
            </div>
          </div>

          <button onClick={onClose} className="ax-btn-icon" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Section 1: General Access (Google Drive Style) */}
          <div style={{
            padding: '16px',
            background: 'var(--color-bg-surface-hover)',
            border: '1px solid var(--color-border-medium)',
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {settings.generalAccess === 'anyone_with_link' ? (
                  <GlobeIcon size={18} style={{ color: 'var(--color-success)' }} />
                ) : (
                  <LockIcon size={18} style={{ color: 'var(--color-warning)' }} />
                )}
                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>{t.generalAccess}</span>
              </div>

              <AxiomDropdown
                size="sm"
                value={settings.generalAccess}
                onChange={(val) => handleGeneralAccessChange(val as any)}
                options={[
                  { id: 'anyone_with_link', label: t.anyoneWithLink },
                  { id: 'restricted', label: t.restricted },
                ]}
                isRtl={isRtl}
              />
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
              {settings.generalAccess === 'anyone_with_link' ? t.anyoneWithLinkDesc : t.restrictedDesc}
            </p>

            {settings.generalAccess === 'anyone_with_link' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  {isRtl ? 'صلاحية من يملك الرابط:' : 'Link permission:'}
                </span>
                <AxiomDropdown
                  size="sm"
                  variant="pill"
                  value={settings.linkRole}
                  onChange={(val) => handleLinkRoleChange(val as any)}
                  options={[
                    { id: 'viewer', label: t.roleViewer },
                    { id: 'commenter', label: t.roleCommenter },
                    { id: 'editor', label: t.roleEditor },
                  ]}
                  isRtl={isRtl}
                />
              </div>
            )}

            {/* Share URL & Copy Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '14px',
              padding: '6px 10px',
              background: 'var(--color-bg-canvas)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)'
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--color-text-secondary)',
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {shareUrl}
              </span>

              <button onClick={handleCopyLink} className="ax-btn ax-btn-primary ax-btn-sm">
                {copied ? (
                  <>
                    <CheckIcon size={14} />
                    <span>{t.linkCopied}</span>
                  </>
                ) : (
                  <>
                    <CopyIcon size={14} />
                    <span>{t.copyLink}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Section 2: Invite Specific People by Email */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 600, marginBottom: '8px' }}>
              {t.invitePeople}
            </h4>

            <form onSubmit={handleInviteUser} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder={t.invitePlaceholder}
                className="ax-input"
                style={{ flex: 1 }}
              />

              <AxiomDropdown
                size="md"
                value={newRole}
                onChange={(val) => setNewRole(val as any)}
                options={[
                  { id: 'viewer', label: t.roleViewer },
                  { id: 'editor', label: t.roleEditor },
                ]}
                isRtl={isRtl}
              />

              <button type="submit" className="ax-btn ax-btn-secondary">
                <UserPlus size={16} />
                <span>{t.inviteBtn}</span>
              </button>
            </form>

            {/* Collaborators List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                {t.peopleWithAccess} ({settings.collaborators.length})
              </span>

              {settings.collaborators.map((user) => (
                <div
                  key={user.email}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-bg-surface-hover)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--color-accent-soft)',
                      color: 'var(--color-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.78rem',
                      fontWeight: 700
                    }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 600 }}>{user.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{user.email}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="ax-badge ax-badge-neutral">
                      {user.role === 'owner' ? t.owner : user.role === 'editor' ? t.roleEditor : t.roleViewer}
                    </span>

                    {user.role !== 'owner' && (
                      <button
                        onClick={() => handleRemoveCollaborator(user.email)}
                        className="ax-btn-icon"
                        style={{ color: 'var(--color-danger)' }}
                        title={t.removeAccess}
                      >
                        <TrashIcon size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Public Link Preview Simulation */}
          <div style={{
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-bg-base)',
            border: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{t.publicPreview}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>{t.publicPreviewDesc}</div>
            </div>

            <button
              onClick={() => {
                onTogglePublicPreview();
                onClose();
              }}
              className="ax-btn ax-btn-secondary ax-btn-sm"
              style={{ gap: '6px' }}
            >
              <ExternalLink size={14} />
              <span>{isPublicPreviewActive ? (isRtl ? 'إيقاف المعاينة' : 'Exit Preview') : (isRtl ? 'تجربة المعاينة' : 'Simulate Preview')}</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--color-border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'var(--color-bg-surface)'
        }}>
          <button onClick={onClose} className="ax-btn ax-btn-secondary">
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
