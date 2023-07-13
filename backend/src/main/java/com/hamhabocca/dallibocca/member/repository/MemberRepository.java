package com.hamhabocca.dallibocca.member.repository;

import com.hamhabocca.dallibocca.member.dto.MemberSimpleDTO;
import com.hamhabocca.dallibocca.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {

	@Query("SELECT new com.hamhabocca.dallibocca.member.dto.MemberSimpleDTO(m.memberId, m.nickname, m.imageSource) FROM Member m WHERE m.memberId = :memberId")
	MemberSimpleDTO findMemberByIdSimple(long memberId);

	List<Member> findByNickname(String nickname);

	@Query("SELECT m FROM Member AS m WHERE m.socialLogin LIKE :socialLogin AND m.socialId LIKE :socialId")
	Member findBySocialId(String socialLogin, String socialId);

//	Object findTopByOrderByMemberIdDesc();
}
